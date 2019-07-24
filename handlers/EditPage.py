import webapp2
import jinja2
import os
from google.appengine.ext import ndb
from google.appengine.api import users,images
from models import ThreadContent,Drawing,Caption,TeleUser,Thread,Edit

the_jinja_env = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)+"/../templates/"),
    extensions=["jinja2.ext.autoescape"],
    autoescape=True)

class EditPage(webapp2.RequestHandler):
    def get(self):
        user = users.get_current_user()
        if not user:
            self.redirect("/welcome")
        else:
            thread_key = ndb.Key(Thread,int(self.request.get("key")))
            thread = thread_key.get()
            print thread
            edit_entity_list = Edit.query().filter(Edit.thread==thread_key).fetch()
            edit_entity_list.sort(key=lambda x: x.addition.get().date,reverse=True)
            lastEditType = edit_entity_list[0].addition.kind()
            # print "1234567890-9876543234567898765432q3456789",lastEditType
            if(lastEditType=="Drawing"):
                self.redirect("/edit-caption?key=%s"%thread_key.id())
            else:
                self.redirect("/edit-drawing?key=%s"%thread_key.id())
            edit_template = the_jinja_env.get_template("edit.html")
            self.response.write(edit_template.render({
                "user_info":user
            }))
