import webapp2
import jinja2
import os
from google.appengine.api import users,images
from models import ThreadContent,Drawing,Caption,TeleUser,Thread,Edit

the_jinja_env = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)+"/../templates/"),
    extensions=["jinja2.ext.autoescape"],
    autoescape=True)

class MyThreadsPage(webapp2.RequestHandler):
    def get(self):
        user = users.get_current_user()
        if not user:
            self.redirect("/welcome")
        else:
            teleUser = TeleUser.get_by_id(user.user_id())
            if not teleUser:
                teleUser = TeleUser.fromGSI(user=user)
                teleUser.put()
            thread_entity_list = Thread.query().fetch()
            edits_by_thread = {}
            user_threads = []
            bailed_threads = []
            for thread in thread_entity_list:
                thread_key = thread.key
                edit_entity_list = Edit.query().filter(Edit.thread==thread_key).fetch()
                if edit_entity_list:
                    edit_entity_list.sort(key=lambda x: x.addition.get().date)
                    edits_by_thread[str(thread_key.id())]=edit_entity_list
                    if thread_key in teleUser.bailedThreads:
                        bailed_threads.append(thread)
                    else:
                        user_threads.append(thread)
            # user_threads.sort(key=lambda x: x.key in teleUser.bailedThreads,reverse=True)
            my_threads_template = the_jinja_env.get_template("my-threads.html")
            self.response.write(my_threads_template.render({
                "user_info":teleUser,
                "logout_url":users.create_logout_url("/welcome"),
                "bailed_threads":bailed_threads,
                "user_threads":user_threads,
                "edits_by_thread":edits_by_thread,
            }))
