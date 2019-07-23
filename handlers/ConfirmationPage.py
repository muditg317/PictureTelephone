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
            edit_type = self.request.get("request_type")
            if edit_type=="caption":
                caption = self.request.get("caption")
                new_caption = Caption(content=caption)
                content_key = new_caption.put()
            elif edit_type=="drawing":
                drawing = self.request.get("drawing")
                drawing = images.resize(image,100,100)
                new_drawing = Drawing(content=drawing)
                content_key = new_drawing.put()
            else:
                self.response.write("oof!")
                return
            new_edit = Edit(user=.thread=,addition=)
