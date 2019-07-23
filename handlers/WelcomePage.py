class WelcomePage(webapp2.RequestHandler):
    def get(self):  # for a get request
        user = users.get_current_user()
        if user:
            self.redirect("/home")
        else:
            welcome_template = the_jinja_env.get_template("templates/welcome.html")
            self.response.write(welcome_template.render({
                "login_url":users.create_login_url('/home')
            }))
