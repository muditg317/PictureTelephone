class HomePage(webapp2.RequestHandler):
    def get(self):
        user = users.get_current_user()
        if not user:
            self.redirect("/welcome")
        else:
            home_template = the_jinja_env.get_template("templates/home.html")
            self.response.write(home_template.render({
                "user_info":user
            }))
