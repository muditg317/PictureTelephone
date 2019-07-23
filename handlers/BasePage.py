class BasePage(webapp2.RequestHandler):
    def get(self):
        self.redirect("/welcome")
