package com.ttnd.linksharing.utils

/**
 * Created by ttnd on 12/7/16.
 */
class ResponsePojo {

    boolean hasError = true;
    def errors = ''
    String message = ""
    boolean result = false

    @Override
    public String toString() {
        return "ResponsePojo{" +
                "hasError=" + hasError +
                ", errors=" + errors +
                ", message='" + message + '\'' +
                ", result=" + result +
                '}';
    }
}
