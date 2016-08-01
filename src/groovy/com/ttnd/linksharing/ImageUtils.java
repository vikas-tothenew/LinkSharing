package com.ttnd.linksharing;

import sun.misc.BASE64Encoder;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.*;

public class ImageUtils {

/**
* Decode string to image
* @param imageString The string to decode
* @return decoded image
*/
	public static BufferedImage decodeToImage(String imageString) {
		System.out.println("In Buffered Image decoder");
		BufferedImage image = null;
		byte[] imageByte;
		try {
				//BASE64Decoder decoder = new BASE64Decoder();
				//imageByte = Base64.decodeBase64(imageString);
				//Base64.decodeToFile(imageString, "H://outputImage.png");
				InputStream stream = new ByteArrayInputStream(ImageEncoder.decodeLines(imageString.toString().trim()));
				image = ImageIO.read(stream);
				System.out.println("image "+image);
				stream.close();
		} catch (Exception e) {
			System.out.println("----------------------Exception while decoding file ----------------------- "+e);
		}
		return image;
	}

	/**
	* Encode image to string
	* @param image The image to encode
	* @param type jpeg, bmp, ...
	* @return encoded string
	*/
	public static String encodeToString(BufferedImage image, String type) {
		String imageString = null;
		ByteArrayOutputStream bos = new ByteArrayOutputStream();

		try {
				ImageIO.write(image, type, bos);
				byte[] imageBytes = bos.toByteArray();

				BASE64Encoder encoder = new BASE64Encoder();
				imageString = encoder.encode(imageBytes);

				bos.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return imageString;
	}

	public static void main (String args[]) throws IOException {
		/* Test image to string and string to image start */
		BufferedImage img = ImageIO.read(new File("D:/test.jpg"));
		BufferedImage newImg;
		String imgstr;
		imgstr = encodeToString(img, "png");
		System.out.println(imgstr);
		newImg = decodeToImage(imgstr);
		ImageIO.write(newImg, "png", new File("D:/test2.png"));
		/* Test image to string and string to image finish */
	}
}