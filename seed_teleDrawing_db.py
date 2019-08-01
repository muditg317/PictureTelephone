from models import *


def seed_db():
    thread_entity_list = Thread.query().fetch()
    for thread in thread_entity_list:
        thread_key = thread.key
        edit_entity_list = Edit.query().filter(Edit.thread==thread_key).fetch()
        edit_entity_list.sort(key=lambda x: x.addition.get().date,reverse=True)
        edit_entity_list = edit_entity_list[:-1]
        for edit in edit_entity_list:
            edit.addition.delete()
            edit.key.delete()
    for thread in thread_entity_list:
        thread.captions=[]
        thread.drawings=[thread.drawings[0]]
        thread.put()
    bailOuts = BailOut.query().fetch()
    for bailOut in bailOuts:
        bailOut.key.delete()
    teleUsers = TeleUser.query().fetch()
    for teleUser in teleUsers:
        teleUser.bailedThreads = []
        teleUser.put()
