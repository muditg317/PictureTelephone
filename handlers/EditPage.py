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
            teleUser = TeleUser.get_by_id(user.user_id())
            if not teleUser:
                teleUser = TeleUser.fromGSI(user=user)
                teleUser.put()
            thread_key = ndb.Key(Thread,int(self.request.get("key")))
            user_bailOuts = [bailOut_key.get() for bailOut_key in teleUser.bailOuts]
            bailed = False
            for bailOut in user_bailOuts:
                if thread_key == bailOut.thread:
                    bailed = True
                    break
            if bailed:
                self.redirect("/my-threads")
                return
            thread = thread_key.get()
            edit_entity_list = Edit.query().filter(Edit.thread==thread_key).fetch()
            edit_entity_list.sort(key=lambda x: x.addition.get().date,reverse=True)
            lastEdit = edit_entity_list[0]
            if lastEdit.user != teleUser.key:
                if(lastEdit.addition.kind()=="Drawing"):
                    self.redirect("/edit-caption?key=%s"%thread_key.id())
                else:
                    self.redirect("/edit-drawing?key=%s"%thread_key.id())
            else:
                edit_template = the_jinja_env.get_template("edit.html")
                self.response.write(edit_template.render({
                    "user_info":user,
                    "thread":thread,
                    "edit":lastEdit,
                    "logout_url":users.create_logout_url("/welcome"),

                }))
