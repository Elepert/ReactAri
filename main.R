## main.R ##
## ------ ##

library(plumber)
r <- plumb('/home/emilylepert/Documents/ARI/plumbTry.R')
print("running")
r$run(port=8000)



