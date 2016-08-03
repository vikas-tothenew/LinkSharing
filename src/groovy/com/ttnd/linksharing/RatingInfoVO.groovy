/**
 * Created by ttnd on 14/7/16.
 */
package com.ttnd.linksharing;


class RatingInfoVO {

    int totalVotes
    int averageScore
    int totalScore
    String message;
    boolean result = true;


    @Override
    public String toString() {
        return "RatingInfoVO{" +
                "totalVotes=" + totalVotes +
                ", averageScore=" + averageScore +
                ", totalScore=" + totalScore +
                '}';
    }
}
