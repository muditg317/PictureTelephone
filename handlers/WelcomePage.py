import webapp2
import jinja2
import os
from google.appengine.api import users,images
from models import ThreadContent,Drawing,Caption,User,Thread,Edit

the_jinja_env = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)+"/../templates/"),
    extensions=["jinja2.ext.autoescape"],
    autoescape=True)

class WelcomePage(webapp2.RequestHandler):
    def get(self):  # for a get request
        user = users.get_current_user()
        if user:
            self.redirect("/home")
        else:
            welcome_template = the_jinja_env.get_template("welcome.html")
            self.response.write(welcome_template.render({
                "login_url":users.create_login_url('/home')
            }))
