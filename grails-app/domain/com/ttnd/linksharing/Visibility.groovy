package com.ttnd.linksharing

/**
 * Created by ttnd on 1/7/16.
 */
enum Visibility {

    PRIVATE,PUBLIC

    static Visibility convert(String str) {
        for (Visibility visibility : Visibility.values()) {
            if (visibility.toString().equalsIgnoreCase(str)) {
                return visibility;
            }
        }
        return null;
    }
}