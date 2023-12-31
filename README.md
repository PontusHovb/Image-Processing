# Image-Processing
This project explores different methods to alter and process images using convolution and deconvolution methods.

## Grayscale
Grayscales is a range of gray shades from white to black, all these color share that red = green = blue. There are several methods to convert colored images to grayscale, two of them are:

### Average Method
In the average method, the RGB-value is calculated as the average of green, red and blue, that is:
$$
\text{Grayscale Value} = \frac{R + G + B}{3}
$$

### Weighted Method / Luminosity Method
Human eyes react differently to RGB, eyes are most sensitive to green light, less to red and least to blue light. Therefore the weighted method weighs red, green and blue according to their wavelenghts. The updated formula then becomes:
$$
\text{Grayscale Value} = 0.299 R + 0.587 G + 0.144 B
$$

## Convolution
In the module _Convolution.js_ different methods for convolutions are implemented. Convolution of pictures is done by multiplying the image ($I$) with a kernel ($H$) to recieve a blurred image ($B$).
$$I * H = B$$
These are

### Gaussian blur
Gausssian blur uses a Gaussian function for convoluting a picture. The Gaussian function in two dimensions is:
$$G(x, y)=\frac{1}{2 \pi \sigma^2} e^{-\frac{x^2+y^2}{2 \sigma^2}}$$
where $x$ is the horizontal distance, $y$ the vertical distance and $\sigma$ the standard deviation of the Gausssian distribution.

## Deconvolution
The task of unblurring images is much more difficult and can be done using Fourier Transforms. The convolution equation ($I*H=B$) becomes
$$FT(I)FT(H)=FT(B)$$ 
using Fuorier Transform. Solving for the original picture $I$ yields:
$$FT(I)=\frac{FT(B)}{FT(H)}$$ 

## Sources:
Kumar, Shashank (2022) (https://towardsdatascience.com/how-to-de-blur-images-without-training-neural-networks-72f8597c0014)
