package com.ttnd.linksharing

/**
 * Created by ttnd on 1/7/16.
 */
enum Seriousness {
    CASUAL,SERIOUS,VERY_SERIOUS

    static Seriousness convert(String str) {
        for (Seriousness seriousness : Seriousness.values()) {
            if (seriousness.toString().equalsIgnoreCase(str)) {
                return seriousness;
            }
        }
        return null;
    }
}