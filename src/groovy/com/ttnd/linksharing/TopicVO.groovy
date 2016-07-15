package com.ttnd.linksharing

/**
 * Created by ttnd on 14/7/16.
 */
class TopicVO {

    long id
    String name
    Visibility visibility
    int count
    User createdBy


    @Override
    public String toString() {
        return "TopicVO{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", visibility=" + visibility +
                ", count=" + count +
                ", createdBy=" + createdBy +
                '}';
    }
}
