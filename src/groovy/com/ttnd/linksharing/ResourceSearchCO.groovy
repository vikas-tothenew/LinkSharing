package com.ttnd.linksharing

/**
 * Created by ttnd on 14/7/16.
 */
class ResourceSearchCO extends SearchCO {

    long topicId
    Visibility visibility

    @Override
    public String toString() {
        return "ResourceSearchCO{" +
                "topicId=" + topicId +
                ", visibility=" + visibility +
                '}';
    }
}