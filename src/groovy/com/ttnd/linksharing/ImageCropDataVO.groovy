package com.ttnd.linksharing

/**
 * Created by ttnd on 19/7/16.
 */
class ImageCropDataVO {


    private String imgUrl;
    private float imgInitW;
    private float imgInitH;
    private float imgW;
    private float imgH;
    private float imgY1;
    private float imgX1;
    private float cropW;
    private float cropH;
    private int rotation;
    private int zoom;

    private int width;
    private int height;

    private String imageTitle;

    private String size;
    private String type;

    private String data;


    @Override
    public String toString() {
        return "ImageCropDataVO{" +
                "imgUrl='" + imgUrl + '\'' +
                ", imgInitW=" + imgInitW +
                ", imgInitH=" + imgInitH +
                ", imgW=" + imgW +
                ", imgH=" + imgH +
                ", imgY1=" + imgY1 +
                ", imgX1=" + imgX1 +
                ", cropW=" + cropW +
                ", cropH=" + cropH +
                ", rotation=" + rotation +
                ", zoom=" + zoom +
                ", width=" + width +
                ", height=" + height +
                ", imageTitle='" + imageTitle + '\'' +
                ", size='" + size + '\'' +
                ", type='" + type + '\'' +
                ", data='" + data + '\'' +
                '}';
    }
}
