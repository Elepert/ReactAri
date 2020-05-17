import tornado.ioloop
import tornado.web
import json
import rpy2
import rpy2.robjects as robjects
from rpy2.robjects.packages import importr

class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.write("Hello, world")

    def post(self):
        body = json.loads(self.request.body.decode('utf-8'))
        slides = body.get("slides")
        title= body.get("title")
        author = body.get("author")
        titleComment = body.get("titleComment")
        f= open("slides.Rmd","w+")
        f.write(f"---\ntitle: \"{title}\"\nauthor: \"{author}\"\noutput: ioslides_presentation\n---\n\n")
        f.write(f"<!-- {titleComment}-->\n\n")
        for slide in slides:
            f.write(slide.get("content"))
            f.write("\n\n<!--")
            f.write(slide.get("comment"))
            f.write("-->\n\n")
        f.close()

        importr('base')
        importr('utils')
        importr('ari')
        importr('rmarkdown')

        robjects.r('''
            Sys.setenv("AWS_ACCESS_KEY_ID" = "your_key_id_here",
                "AWS_SECRET_ACCESS_KEY" = "your_access_key_here",
                "AWS_DEFAULT_REGION" = "us-east-2")
        ''')

        robjects.r('''
            rmd_file <- 'slides.Rmd'
        ''')
        r_rmd_file = robjects.globalenv['rmd_file']
        print(r_rmd_file.r_repr())
        robjects.r('''
            html_file <- rmarkdown::render('slides.Rmd')
        ''')
        robjects.r('''
            ari_narrate(rmd_file, html_file, output = "/home/emilylepert/Documents/ReactAri/ari-app/public/videos/output4.mp4", voice = "Joanna", capture_method = "iterative")
        ''')
        
        self.write("HI friends")

def make_app():
    return tornado.web.Application([
        (r"/", MainHandler),
    ])

if __name__ == "__main__":
    app = make_app()
    app.listen(8888)
    tornado.ioloop.IOLoop.current().start()

    # rmarkdown::render('/home/emilylepert/Documents/ARI/ari_comments.Rmd')