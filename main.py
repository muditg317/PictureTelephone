import webapp2
import jinja2
import os
from google.appengine.api import users
from models import ThreadContent,Drawing,Caption,User,Thread,Edit

the_jinja_env = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
    extensions=["jinja2.ext.autoescape"],
    autoescape=True)

class BasePage(webapp2.RequestHandler):
    def get(self):
        self.redirect("/welcome")

class Welcome(webapp2.RequestHandler):
    def get(self):  # for a get request
        user = users.get_current_user()
        if user:
            self.redirect("/home")
        else:
            welcome_template = the_jinja_env.get_template("templates/welcome.html")
            self.response.write(welcome_template.render({
                "login_url":users.create_login_url('/home')
            }))

class Home(webapp2.RequestHandler):
    def get(self):
        user = users.get_current_user()
        if not user:
            self.redirect("/welcome")
        else:
        home_template = the_jinja_env.get_template("templates/home.html")
        self.response.write(home_template.render({
            "login_url":users.create_login_url('/home')
        }))

app = webapp2.WSGIApplication([
    ("/", BasePage),
    ("/welcome", WelcomePage),
], debug=True)
