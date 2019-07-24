import webapp2
import sys
sys.path.append('../')
from handlers.BasePage import BasePage
from handlers.CreatePage import CreatePage
from handlers.EditPage import EditPage
from handlers.HomePage import HomePage
from handlers.WelcomePage import WelcomePage
from handlers.EditDrawingPage import EditDrawingPage


app = webapp2.WSGIApplication([
    ("/", BasePage),
    ("/create", CreatePage),
    ("/edit", EditPage),
    ("/home", HomePage),
    ("/welcome", WelcomePage),
    ('/edit-drawing', EditDrawingPage),
], debug=True)
