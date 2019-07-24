import webapp2
import jinja2
import os
from google.appengine.api import users,images
from models import ThreadContent,Drawing,Caption,TeleUser,Thread,Edit

the_jinja_env = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)+"/../templates/"),
    extensions=["jinja2.ext.autoescape"],
    autoescape=True)

class HomePage(webapp2.RequestHandler):
    def get(self):
        user = users.get_current_user()
        if not user:
            self.redirect("/welcome")
        else:
            teleUser = TeleUser.get_by_id(user.user_id())
            if not teleUser:
                teleUser = TeleUser.fromGSI(user=user)
                teleUser.put()
            home_template = the_jinja_env.get_template("home.html")
            thread_entity_list = Thread.query().fetch()
            edit_entity_list = Edit.query().fetch()
            drawing_entity_list = Drawing.query().fetch()
            caption_entity_list = Caption.query().fetch()
            self.response.write(home_template.render({
                "user_info":teleUser,
                "logout_url":users.create_logout_url("/welcome"),
                "threads":thread_entity_list,
                "edits":edit_entity_list,
                "drawings":drawing_entity_list,
                "captions":caption_entity_list
            }))
