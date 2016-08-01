package com.ttnd.linksharing

import org.grails.datastore.mapping.collection.PersistentSet

/**
 * Created by ttnd on 14/7/16.
 */
class TopicVO {

    long id
    String name
    Visibility visibility
    int count
    User createdBy
    Date lastUpdated
    ArrayList<Subscription> subscriptions
    ArrayList<Resource> resources

    @Override
    public String toString() {
        return "TopicVO{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", visibility=" + visibility +
                ", count=" + count +
                ", createdBy=" + createdBy +
                ", subscriptions=" + subscriptions +
                ", resources=" + resources +
                '}';
    }
}
