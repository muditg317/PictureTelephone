from google.appengine.ext import ndb

class ThreadContent(ndb.Model):
    date = ndb.DateTimeProperty(auto_now_add=True)

class Drawing(ThreadContent):
    content = ndb.BlobProperty(required=True)

class Caption(ThreadContent):
    content = ndb.StringProperty(required=True)

class User(ndb.Model):
    username = ndb.StringProperty(required=True)
    id = ndb.IntegerProperty(required=True)

class Thread(ndb.Model):
    thread_id = ndb.IntegerProperty(required=True)
    drawings = ndb.KeyProperty(Drawing,repeated=True)
    captions = ndb.KeyProperty(Caption,repeated=True)

class Edit(ndb.Model):
    user = ndb.KeyProperty(User)
    thread = ndb.KeyProperty(Thread)
    addtion = ndb.KeyProperty(ThreadContent)
