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
            user_bailOuts = [bailOut_key.get() for bailOut_key in teleUser.bailOuts]
            bailed_threads = []
            user_threads = []
            edits_by_thread = {}
            for thread in thread_entity_list:
                thread_key = thread.key
                edit_entity_list = Edit.query().filter(Edit.thread==thread_key).fetch()
                if edit_entity_list:
                    edit_entity_list.sort(key=lambda x: x.addition.get().date)
                    bailed = False
                    for bailOut in user_bailOuts:
                        if thread_key == bailOut.thread:
                            bailed = True
                            bailed_threads.append(thread)
                            last_edit_before_bail = bailOut.last_edit.get()
                            for i in range(len(edit_entity_list)):
                                if edit_entity_list[i] == last_edit_before_bail:
                                    edit_entity_list = edit_entity_list[0:i+1]
                                    break
                            break
                    if not bailed:
                        user_threads.append(thread)
                    edits_by_thread[str(thread_key.id())]=edit_entity_list
            # user_threads.sort(key=lambda x: x.key in teleUser.bailedThreads,reverse=True)
            my_threads_template = the_jinja_env.get_template("my-threads.html")
            self.response.write(my_threads_template.render({
                "user_info":teleUser,
                "logout_url":users.create_logout_url("/welcome"),
                "bailed_threads":bailed_threads,
                "user_threads":user_threads,
                "edits_by_thread":edits_by_thread,
            }))
