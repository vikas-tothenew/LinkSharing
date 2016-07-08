/**
 * Created by ttnd on 8/7/16.
 */
package com.ttnd.linksharing.utils;

import org.hibernate.dialect.MySQL5InnoDBDialect
import java.sql.Types

class MyCustomMySQL5InnoDBDialect extends MySQL5InnoDBDialect {

    MyCustomMySQL5InnoDBDialect() {
        registerColumnType(Types.BIT, 'boolean')
    }

}
