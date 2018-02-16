# Line-Image-Filter
This image filter can be used to accentuate the lines of an image. After making a filter that tests if pixels around every single pixel are different in shade, and draws different colors based on the results, I added user interface features, including sliders to change the colors, and also adjusted sensitivity.

Boundary Cases and Limits of the Filter: 
The filter works best with images of angular shapes, which possess distinct corners, so it may not work as well with curved objects on certain settings, as the shades of adjacent pixels do not change drastically, so fewer lines will be drawn. The filter should however always capture the silhouette of an object, unless the background is very similar to the foreground. 

Sources: Code for the sliders came from the p5 reference library, at https://p5js.org/reference/#/p5/createSlider. The image of a giant Lego castle is from https://www.instagram.com/giocovisione/, and is public domain. 
