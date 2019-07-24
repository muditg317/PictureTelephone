import webapp2
import jinja2
import os
from google.appengine.api import users,images
from models import ThreadContent,Drawing,Caption,TeleUser,Thread,Edit

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
            thread = Thread(thread_id=324789567483)
            if edit_type=="caption":
                caption = self.request.get("caption")
                new_caption = Caption(content=caption)
                content_key = new_caption.put()
                thread.captions.append(content_key)
            elif edit_type=="drawing":
                drawing = self.request.get("drawing")
                drawing = images.resize(drawing,20,20)
                new_drawing = Drawing(content=drawing)
                content_key = new_drawing.put()
                thread.drawings.append(content_key)
            else:
                self.response.write("oof!")
                return
            thread_key = thread.put()
            new_edit = Edit(user=teleUser.key,thread=thread_key,addition=content_key)
            new_edit.put()
