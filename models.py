from google.appengine.ext import ndb

class ThreadContent(ndb.Model):
    date = ndb.DateTimeProperty(auto_now_add=True)

class Drawing(ThreadContent):
    content = ndb.BlobProperty(required=True)

class Caption(ThreadContent):
    content = ndb.StringProperty(required=True)

class Thread(ndb.Model):
    thread_id = ndb.IntegerProperty(required=True)
    drawings = ndb.KeyProperty(Drawing,repeated=True)
    captions = ndb.KeyProperty(Caption,repeated=True)

class TeleUser(ndb.Model):
    username = ndb.StringProperty(required=True)
    # email = ndb.StringProperty(required=True)
    bailedThreads = ndb.KeyProperty(Thread,repeated=True)

    @staticmethod
    def fromGSI(user):
        email = user.nickname()
        username = email[:email.index("@")]
        teleUser = TeleUser(username=username,id=user.user_id())
        return teleUser

class Edit(ndb.Model):
    user = ndb.KeyProperty(TeleUser,required=True)
    thread = ndb.KeyProperty(Thread,required=True)
    addition = ndb.KeyProperty(required=True)
