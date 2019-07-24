from models import ThreadContent,Drawing,Caption,TeleUser,Thread,Edit

def deleteObj(Model):
    entities = Model.query().fetch()
    for entity in entities:
        entity.key.delete()

def seed_db():
    deleteObj(Edit)
    deleteObj(Drawing)
    deleteObj(Caption)
    threads = Thread.query().fetch()
    for thread in threads:
        thread.captions=[]
        thread.drawings=[]
        thread.put()
