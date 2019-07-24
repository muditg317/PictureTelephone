import webapp2
import sys
sys.path.append('../')
from handlers.BasePage import BasePage
from handlers.ConfirmationPage import ConfirmationPage
from handlers.CreatePage import CreatePage
from handlers.EditPage import EditPage
from handlers.HomePage import HomePage
from handlers.WelcomePage import WelcomePage
from handlers.EditDrawingPage import EditDrawingPage
from handlers.EditCaptionPage import EditCaptionPage
from handlers.TestPage import TestPage
from handlers.DrawingsHandler import DrawingsHandler
from seed_teleDrawing_db import seed_db


class SeedDB(webapp2.RequestHandler):
    def get(self):
        seed_db()
        self.redirect("/home")

app = webapp2.WSGIApplication([
    ("/", BasePage),
    ("/seed-db",SeedDB),
    ("/confirmation",ConfirmationPage),
    ("/create", CreatePage),
    ("/edit", EditPage),
    ("/home", HomePage),
    ("/welcome", WelcomePage),
    ('/edit-drawing', EditDrawingPage),
    ('/edit-caption', EditCaptionPage),
    ('/test', TestPage),
    ("/drawings",DrawingsHandler),
], debug=True)
