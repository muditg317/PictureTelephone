import webapp2
import jinja2
import os
from google.appengine.api import users,images
from models import ThreadContent,Drawing,Caption,User,Thread,Edit
from BasePage import BasePage
from CreatePage import CreatePage
from EditPage import EditPage
from HomePage import HomePage
from WelcomePage import WelcomePage


the_jinja_env = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
    extensions=["jinja2.ext.autoescape"],
    autoescape=True)


app = webapp2.WSGIApplication([
    ("/", BasePage),
    ("/create", CreatePage),
    ("/edit", EditPage),
    ("/home", HomePage),
    ("/welcome", WelcomePage),
], debug=True)
