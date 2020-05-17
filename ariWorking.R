library(ari)
library(rmarkdown)
# First set up your AWS keys
Sys.setenv("AWS_ACCESS_KEY_ID" = "AKIAUBQNCIH2SBSF6GFO",
           "AWS_SECRET_ACCESS_KEY" = "/ZNTODTFFDp+0HWSNabp4uJRHGzrQQNRJEvh2YVL",
           "AWS_DEFAULT_REGION" = "us-east-2")

rmd_file <- 'Documents/ARI/ari_comments.Rmd'
# 
html_file <- rmarkdown::render('Documents/ARI/ari_comments.Rmd')

ari_narrate(rmd_file, html_file, output = "/home/emilylepert/Documents/ARI/output4.mp4", voice = "Joanna", capture_method = "iterative")
