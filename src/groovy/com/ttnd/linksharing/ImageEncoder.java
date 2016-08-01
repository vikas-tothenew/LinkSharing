package com.ttnd.linksharing;

import java.io.*;

/**
 *
 * @author Vkscool
 */
public class ImageEncoder {
    
    private FileInputStream fin;
    private File file;
    private static final String systemLineSeparator = System.getProperty("line.separator");
    private static final char[] base64chars = new char[64];
    private static final byte[] base64inv = new byte[128];
    static{
        //base64chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".toCharArray();
         int i=0;
         for (char c='A'; c<='Z'; c++) {
            base64chars[i++] = c;
         }
         for (char c='a'; c<='z'; c++) {
            base64chars[i++] = c;
         }
         for (char c='0'; c<='9'; c++) {
            base64chars[i++] = c;
         }
         base64chars[i++] = '+'; base64chars[i++] = '/';
         
         for (i=0; i<base64inv.length; i++) {
            base64inv[i] = -1;
         }
         for (i = 0; i < base64chars.length; i++) 
         { 
             base64inv[base64chars[i]] = (byte) i; 
         }
    }
    public ImageEncoder() throws FileNotFoundException, IOException
    {
       file = new File("H:\\vkscool\\images.jpg");
       fin = new FileInputStream(file); 
    }
    
    
    private byte[] readBytes()
    {
        ByteArrayOutputStream ba = new ByteArrayOutputStream();
        int i;
        try {
            while((i=fin.read())!=-1)
            {
                ba.write(i);
            }
        } catch (IOException ex) {
            System.out.println(ex);
        }
        return ba.toByteArray();
    }
    
    private void writeBytes(char[] out)
    {
        try {
            FileOutputStream fout = new FileOutputStream(new File("H:\\vkscool\\vks2.txt"),false);
            char c='a';
            //System.out.println(out);
            for(int i=0;i<out.length;i++)
            {
                c=out[i];
                fout.write(c);
            }
        } catch (Exception ex) {
            System.out.println(ex);
        }
    }
    
    public void encode()
    {
        //System.out.println(readBytes().length);
        char[] toCharArray = encodeLines(readBytes()).toCharArray();
        writeBytes(toCharArray);
        //System.out.println(toCharArray);
    }
    public void encode(int i)
    {
        byte[] b = readBytes();
        //System.out.println(b.length);
        writeBytes(encode(b,0,b.length));
    }
   /**
    * Encodes a byte array into Base 64 format and breaks the output into lines of 76 characters.
    * This method is compatible with <code>sun.misc.BASE64Encoder.encodeBuffer(byte[])</code>.
    * @param in  An array containing the data bytes to be encoded.
    * @return    A String containing the Base64 encoded data, broken into lines.
    */
    
    public String encodeLines (byte[] in) {
        System.out.println(in.length);
        return encodeLines(in, 0, in.length, 76, systemLineSeparator); 
    }

/**
* Encodes a byte array into Base 64 format and breaks the output into lines.
* @param in            An array containing the data bytes to be encoded.
* @param iOff          Offset of the first byte in <code>in</code> to be processed.
* @param iLen          Number of bytes to be processed in <code>in</code>, starting at <code>iOff</code>.
* @param lineLen       Line length for the output data. Should be a multiple of 4.
* @param lineSeparator The line separator to be used to separate the output lines.
* @return              A String containing the Base64 encoded data, broken into lines.
*/
    private  String encodeLines (byte[] in, int iOff, int iLen, int lineLen, String lineSeparator) 
    {
        int blockLen = (lineLen*3) / 4;
        if (blockLen <= 0) {
            throw new IllegalArgumentException();
        }
        int lines = (iLen+blockLen-1) / blockLen;
        int bufLen = ((iLen+2)/3)*4 + lines*lineSeparator.length();
        System.out.println(iLen);
        StringBuilder buf = new StringBuilder();
        int ip = 0;
        while (ip < iLen) 
        {
            int l = Math.min(iLen-ip, blockLen);
            buf.append (encode(in, iOff+ip, l));
            buf.append (lineSeparator);
            ip += l; 
        }
        return buf.toString(); 
    }
    
    private char[] encode(byte[] in, int iOff, int iLen)
    {  
       int oDataLen = (iLen*4+2)/3;       // output length without padding
       int oLen = ((iLen+2)/3)*4;         // output length including padding
       char[] out = new char[oLen];
       int ip = iOff;
       int iEnd = iOff + iLen;
       int op = 0;
       
      /* System.out.println("oDataLen "+ oDataLen);
       System.out.println("oLen "+ oLen);
       System.out.println("ip "+ ip);
       System.out.println("iEnd "+ iEnd);*/
       
       while (ip < iEnd) 
       {
          int i0 = in[ip++] & 0xff;
          int i1 = ip < iEnd ? in[ip++] & 0xff : 0;
          int i2 = ip < iEnd ? in[ip++] & 0xff : 0;
          int o0 = i0 >>> 2;
          int o1 = ((i0 &   3) << 4) | (i1 >>> 4);
          int o2 = ((i1 & 0xf) << 2) | (i2 >>> 6);
          int o3 = i2 & 0x3F;
         /* System.out.println(NumberToBinary.convert((int)in[0]) + " " + in[0]);
          System.out.println(NumberToBinary.convert(i0)  + " io " +i0);
          System.out.println(NumberToBinary.convert(i1)  + " i1 " + i1);
          System.out.println(NumberToBinary.convert(i2)  + " i2 " + i2);
          System.out.println(NumberToBinary.convert(o0)  + " o0 " + o0);
          System.out.println(NumberToBinary.convert(o1)  + " o1 " + o1);
          System.out.println(NumberToBinary.convert(o2)  + " o2 " + o2);
          System.out.println(NumberToBinary.convert(o3)  + " o3 " + o3);*/
          out[op++] = base64chars[o0];
          out[op++] = base64chars[o1];
          out[op] = op < oDataLen ? base64chars[o2] : '='; op++;
          out[op] = op < oDataLen ? base64chars[o3] : '='; op++; 
          
         //System.out.println(String.);
        
      }
      return out;
    } 
    
    public static void decodeFile(File fl) throws FileNotFoundException, IOException
    {
        BufferedReader br = new BufferedReader(new FileReader(fl));
        FileOutputStream fp = new FileOutputStream(new File("H:\\vks.jpg"),false);
        String b;
        StringBuilder bb = new StringBuilder(); 
        while((b=br.readLine())!=null) {
            //System.out.println(b.length());
            bb.append(String.format("%s%n", b));
            //break;
            //bb.append(systemLineSeparator);
        }
        /*InputStream stream = new ByteArrayInputStream(decodeLines(bb.toString().trim()));
        
        BufferedImage image = ImageIO.read(stream);
        
        ImageIO.write(image, "jpg", fp);*/
        fp.write(decodeLines(bb.toString().trim()));
    }
    
    /**
* Decodes a string from Base64 format.
* No blanks or line breaks are allowed within the Base64 encoded input data.
* @param s  A Base64 String to be decoded.
* @return   A String containing the decoded data.
* @throws   IllegalArgumentException If the input is not valid Base64 encoded data.
*/
    public static String decodeString (String s) 
    {
       return new String(decode(s)); 
    }

/**
* Decodes a byte array from Base64 format and ignores line separators, tabs and blanks.
* CR, LF, Tab and Space characters are ignored in the input data.
* This method is compatible with <code>sun.misc.BASE64Decoder.decodeBuffer(String)</code>.
* @param s  A Base64 String to be decoded.
* @return   An array containing the decoded data bytes.
* @throws   IllegalArgumentException If the input is not valid Base64 encoded data.
*/
    public static byte[] decodeLines (String s) 
    {
          char[] buf = new char[s.length()];
          int p = 0;
          for (int ip = 0; ip < s.length(); ip++) 
          {
            char c = s.charAt(ip);
            if (c != ' ' && c != '\r' && c != '\n' && c != '\t') {
                  buf[p++] = c;
              } 
          }
          return decode(buf, 0, p); 
    }

/**
* Decodes a byte array from Base64 format.
* No blanks or line breaks are allowed within the Base64 encoded input data.
* @param s  A Base64 String to be decoded.
* @return   An array containing the decoded data bytes.
* @throws   IllegalArgumentException If the input is not valid Base64 encoded data.
*/
    public static byte[] decode (String s) 
    {
         return decode(s.toCharArray()); 
    }

/**
* Decodes a byte array from Base64 format.
* No blanks or line breaks are allowed within the Base64 encoded input data.
* @param in  A character array containing the Base64 encoded data.
* @return    An array containing the decoded data bytes.
* @throws    IllegalArgumentException If the input is not valid Base64 encoded data.
*/
    public static byte[] decode (char[] in) 
    {
       return decode(in, 0, in.length); 
    }

/**
* Decodes a byte array from Base64 format.
* No blanks or line breaks are allowed within the Base64 encoded input data.
* @param in    A character array containing the Base64 encoded data.
* @param iOff  Offset of the first character in <code>in</code> to be processed.
* @param iLen  Number of characters to process in <code>in</code>, starting at <code>iOff</code>.
* @return      An array containing the decoded data bytes.
* @throws      IllegalArgumentException If the input is not valid Base64 encoded data.
*/
   public static byte[] decode (char[] in, int iOff, int iLen) 
   {
       if (iLen%4 != 0) {
           System.out.println(iLen);
           throw new IllegalArgumentException ("Length of Base64 encoded input string is not a multiple of 4.");
       }
       while (iLen > 0 && in[iOff+iLen-1] == '=') {
           iLen--;
       }
       int oLen = (iLen*3) / 4;
       byte[] out = new byte[oLen];
       int ip = iOff;
       int iEnd = iOff + iLen;
       int op = 0;
       while (ip < iEnd) 
       {
         int i0 = in[ip++];
         int i1 = in[ip++];
         int i2 = ip < iEnd ? in[ip++] : 'A';
         int i3 = ip < iEnd ? in[ip++] : 'A';
         if (i0 > 127 || i1 > 127 || i2 > 127 || i3 > 127) {
               throw new IllegalArgumentException ("Illegal character in Base64 encoded data.");
           }
         int b0 = base64inv[i0];
         int b1 = base64inv[i1];
         int b2 = base64inv[i2];
         int b3 = base64inv[i3];
         if (b0 < 0 || b1 < 0 || b2 < 0 || b3 < 0) {
               throw new IllegalArgumentException ("Illegal character in Base64 encoded data.");
         }
         int o0 = ( b0       <<2) | (b1>>>4);
         int o1 = ((b1 & 0xf)<<4) | (b2>>>2);
         int o2 = ((b2 &   3)<<6) |  b3;
         out[op++] = (byte)o0;
         if (op<oLen) {
               out[op++] = (byte)o1;
           }
         if (op<oLen) {
               out[op++] = (byte)o2;
           } 
       }
         return out; 
   }
    
}

