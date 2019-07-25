import webapp2
import jinja2
import os
from google.appengine.api import users,images
from models import ThreadContent,Drawing,Caption,TeleUser,Thread,Edit
from io import BytesIO
from PIL import Image
from StringIO import StringIO
import base64

the_jinja_env = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)+"/../templates/"),
    extensions=["jinja2.ext.autoescape"],
    autoescape=True)

class ConfirmationPage(webapp2.RequestHandler):
    def get(self):
        self.redirect("/welcome")

    def post(self):
        user = users.get_current_user()
        if not user:
            self.redirect("/welcome")
        else:
            teleUser = TeleUser.get_by_id(user.user_id())
            if not teleUser:
                teleUser = TeleUser.fromGSI(user=user)
                teleUser.put()
            edit_type = self.request.get("request_type")
            print self.request.get("thread_id")
            thread_id = int(self.request.get("thread_id"))
            thread_entity_list = Thread.query().filter(Thread.thread_id==thread_id).fetch()
            if thread_entity_list:
                thread = thread_entity_list[0]
            else:
                thread = Thread(thread_id=thread_id)
            print thread
            if edit_type=="caption":
                caption = self.request.get("caption")
                new_caption = Caption(content=caption)
                content_key = new_caption.put()
                thread.captions.append(content_key)
            elif edit_type=="drawing":
                drawingDataUrl = self.request.get("drawing")
                img_data = drawingDataUrl.split('data:image/png;base64,')[1]
                img = Image.open(BytesIO(base64.b64decode(img_data)))
                output = StringIO()
                img.save(output, format=img.format)
                drawing = output.getvalue()
                new_drawing = Drawing(content=drawing)
                content_key = new_drawing.put()
                thread.drawings.append(content_key)
            else:
                self.response.write("oof!")
                return
            thread_key = thread.put()
            edit_entity_list = Edit.query().filter(Edit.thread==thread_key).fetch()
            edit_entity_list.sort(key=lambda x: x.addition.get().date,reverse=True)
            new_edit = Edit(user=teleUser.key,thread=thread_key,addition=content_key)
            new_edit.put()
            for edit in edit_entity_list:
                print edit.thread.id(),":",edit.thread.get().thread_id,":",edit.addition.kind()
            last_edit = edit_entity_list[0]
            confirmation_template = the_jinja_env.get_template("confirmation.html")
            self.response.write(confirmation_template.render({
                "user_info":user,
                "thread":thread,
                "last_edit":last_edit,
                "new_edit":new_edit
            }))
