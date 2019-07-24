import webapp2
import jinja2
import os
from google.appengine.api import users,images
from google.appengine.ext import ndb
from models import ThreadContent,Drawing,Caption,TeleUser,Thread,Edit

the_jinja_env = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)+"/../templates/"),
    extensions=["jinja2.ext.autoescape"],
    autoescape=True)

class DrawingsHandler(webapp2.RequestHandler):
    def get(self):
        drawing_key = ndb.Key(Drawing,int(self.request.get("key")))
        # drawing = Drawing.query().filter(Drawing.key.id()==drawing_key).fetch()
        drawing = drawing_key.get()
        if drawing:
           self.response.headers['Content-Type'] = "image/png"
           self.response.out.write(drawing.content)
        else:
           self.error(404)
