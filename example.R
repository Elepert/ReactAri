library(ari)
library(rmarkdown)

# First set up your AWS keys
Sys.setenv("AWS_ACCESS_KEY_ID" = "AKIAUBQNCIH2SBSF6GFO",
           "AWS_SECRET_ACCESS_KEY" = "/ZNTODTFFDp+0HWSNabp4uJRHGzrQQNRJEvh2YVL",
           "AWS_DEFAULT_REGION" = "us-east-2")
rmd_file <- 'Documents/ARI/ari_comments.Rmd'

html_file <- rmarkdown::render('Documents/ARI/ari_comments.Rmd')

ari_narrate(rmd_file, html_file, output = "/home/emilylepert/Documents/ARI/output.mp4", voice = "Kendra", capture_method = "iterative")
# Create a video from a Markdown file and slides
# ari_narrate( #'/home/emilylepert/Documents/ARI/intro_script.md',
#             script = 'Documents/ARI/ari_comments.Rmd',
#             voice = "Joey")
# ari_narrate(system.file("test", "ari_intro_script.md", package = "ari"),
#             system.file("test", "ari_intro.html", package = "ari"),
#             voice = "Joey")

## End(Not run)
# # Create a video from an R Markdown file with comments and slides
# ari_narrate(
#   ari_example("ari_comments.Rmd"),
#   ari_example("ari_intro.html"),
#   voice = "Kendra")
# 
# # Create a video from images and strings
# ari_spin(
#   ari_example(c("mab1.png", "mab2.png")),
#   c("This is a graph.", "This is another graph"),
#   voice = "Joanna")
# 
# # Create a video from images and Waves
# library(tuneR)
# ari_stitch(
#   ari_example(c("mab1.png", "mab2.png")),
#   list(noise(), noise()))
