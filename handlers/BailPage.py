import webapp2
import jinja2
import os
from google.appengine.ext import ndb
from google.appengine.api import users,images
from models import *

the_jinja_env = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)+"/../templates/"),
    extensions=["jinja2.ext.autoescape"],
    autoescape=True)

class BailPage(webapp2.RequestHandler):
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
            thread = thread_key.get()
            edit_entity_list = Edit.query().filter(Edit.thread==thread_key).fetch()
            edit_entity_list.sort(key=lambda x: x.addition.get().date)
            new_bailOut = BailOut(thread=thread_key,last_edit=edit_entity_list[-1].key)
            bailOuts = BailOut.query().filter(BailOut.thread==thread_key).fetch();
            if bailOuts:
                pass# new_bailOut = bailOuts[0]
            else:
                teleUser.bailOuts.append(new_bailOut.put())
                teleUser.put()
            bail_template = the_jinja_env.get_template("bail.html")
            self.response.write(bail_template.render({
                "user_info":teleUser,
                "logout_url":users.create_logout_url("/welcome"),
                "thread":thread,
                "edit_list":edit_entity_list,
            }))
