## functions.R ##
## ----------- ##
library(ari)
library(rmarkdown)
library(plumber)

#* @filter cors
cors <- function(res) {
  # res$setHeader("Access-Control-Allow-Origin", "*")
  # res$setHeader("Access-Control-Allow-Headers", "Content-Type")
  # res$setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
  plumber::forward()
}

#* @preempt cors
#* @options /createVideo
#* @post /createVideo
function(req) {
  require(jsonlite)
  # First set up your AWS keys
  Sys.setenv("AWS_ACCESS_KEY_ID" = "AKIAUBQNCIH2SBSF6GFO",
             "AWS_SECRET_ACCESS_KEY" = "/ZNTODTFFDp+0HWSNabp4uJRHGzrQQNRJEvh2YVL",
             "AWS_DEFAULT_REGION" = "us-east-2")
  
  # post body
  print(req$postBody)
  body <- jsonlite::fromJSON(req$postBody)
  json_data_frame <- as.data.frame(body)
  # body <- req$postBody
  .data <- body$.data
    
  print(json_data_frame)
  # rmd_file <- 'Documents/ARI/ari_comments.Rmd'
  # 
  # html_file <- rmarkdown::render('Documents/ARI/ari_comments.Rmd')
  # 
  # ari_narrate(rmd_file, html_file, output = "/home/emilylepert/Documents/ARI/output4.mp4", voice = "Joanna", capture_method = "iterative")
}
