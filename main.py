import webapp2
import sys
sys.path.append('../')
from handlers.BasePage import BasePage
from handlers.ConfirmationPage import ConfirmationPage
from handlers.CreatePage import CreatePage
from handlers.EditPage import EditPage
from handlers.HomePage import HomePage
from handlers.WelcomePage import WelcomePage


app = webapp2.WSGIApplication([
    ("/", BasePage),
    ("/confirmation",ConfirmationPage),
    ("/create", CreatePage),
    ("/edit", EditPage),
    ("/home", HomePage),
    ("/welcome", WelcomePage),
], debug=True)
