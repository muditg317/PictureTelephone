from google.appengine.ext import ndb

class ThreadContent(ndb.Model):
    date = ndb.DateTimeProperty(auto_now_add=True)

class Drawing(ThreadContent):
    content = ndb.BlobProperty(required=True)

class Caption(ThreadContent):
    content = ndb.StringProperty(required=True)

class User(ndb.Model):
    username = ndb.StringProperty(required=True)

class Thread(ndb.Model):
    thread_id = ndb.IntegerProperty(required=True)
    drawings = ndb.KeyProperty(Drawing,required=True,repeated=True)
    captions = ndb.KeyProperty(Caption,required=True,repeated=True)

class Edit(ndb.Model):
    addtion = ndb.KeyProperty(ThreadContent)
    user = ndb.KeyProperty(User)
