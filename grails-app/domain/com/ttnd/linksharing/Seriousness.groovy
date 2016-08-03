package com.ttnd.linksharing

/**
 * Created by ttnd on 1/7/16.
 */
enum Seriousness {
    CASUAL,SERIOUS,VERY_SERIOUS

    static Seriousness convert(String str) {
        return str as Seriousness
    }
}