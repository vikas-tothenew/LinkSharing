package com.ttnd.linksharing

import org.joda.time.LocalDate
import org.joda.time.Period
import org.joda.time.PeriodType;

/**
 * Created by ttnd on 21/7/16.
 */
class DefaultMethods {


    public static String getTimeDifference(java.util.Date d1,java.util.Date d2){
    	String s = "few seconds ago";
    	try {
			if(d1==null && d2==null)
				return s;
			if(d1==null)
				d1 = new Date();
			if(d2==null)
				d2 = new Date();
			if(d1.compareTo(d2)==1){
				java.util.Date d3 = d2;
				d2 = d1;
				d1 = d3;
			}
			//println.error(d1.toLocaleString());
			//println.error(d2.toLocaleString());

			Period period = new Period(new LocalDate(d1), new LocalDate(d2), PeriodType.yearMonthDayTime());
			/*int year = period.getYears();
			int month = period.getMonths();
			int days = period.getDays();
			int hours = period.getHours();
			int minute = period.getMinutes();
			int seconds = period.getSeconds();*/


			//in milliseconds
			long diff = d2.getTime() - d1.getTime();

			long seconds = diff / 1000 % 60;
			long minute = diff / (60 * 1000) % 60;
			long hours = diff / (60 * 60 * 1000) % 24;
			long days = diff / (24 * 60 * 60 * 1000);
			long month = period.getMonths();//diff / (30 * 24 *60 *60 * 1000);
			long year = period.getYears();//diff / (365 * 24 *60 *60 * 1000);

			//println.error(year+"-"+month+"-"+days+"-"+hours+"-"+minute+"-"+seconds);

			if(year>0){
				if(month>0){
					if(days>0){
						s = year+" year "+month+" month "+days+" days ago";
					}else{
						s = year+" year "+month+" month ago";
					}
				}else{
					s = year+" year ago";
				}
			}else{
				if(month>0){
					if(days>0){
						s = month+" month "+days+" days ago";
					}else{
						s = month+" month ago";
					}
				}else{
					if(days>0){
						s = days+" days ago";
					}else{
						if(hours>0){
							s = hours+" hour ago";
						}else{
							if(minute>0){
								s = minute+" minute ago";
							}else{
								if(seconds>0){
									s = seconds+" seconds ago";
								}
							}
						}
					}
				}
			}
		}catch (Exception e) {
			println("-----Exception in getTimeDifference of DefaultMethods----- as "+e);
		}
    	//println.error("Returning with time "+s);
    	return s;
    }

    public String getTimeDifference2(Date d1,Date d2){
    	String s = "#";
    	try {

			if(d1.compareTo(d2)==1){
				java.util.Date d3 = d2;
				d2 = d1;
				d1 = d3;
			}

			Period period = new Period(new LocalDate(d1), new LocalDate(d2), PeriodType.yearMonthDayTime());

			long diff = d2.getTime() - d1.getTime();

			long seconds = diff / 1000 % 60;
			long minute = diff / (60 * 1000) % 60;
			long hours = diff / (60 * 60 * 1000) % 24;
			long days = diff / (24 * 60 * 60 * 1000);
			long month = period.getMonths();//diff / (30 * 24 *60 *60 * 1000);
			long year = period.getYears();//diff / (365 * 24 *60 *60 * 1000);

			if(year>0){
				if(month>0){
					if(days>0){
						s = year+" year "+month+" month "+days+" days";
					}else{
						s = year+" year "+month+" month";
					}
				}else{
					s = year+" year";
				}
			}else{
				if(month>0){
					if(days>0){
						s = month+" month "+days+" days";
					}else{
						s = month+" month";
					}
				}else{
					if(days>0){
						s = days+" days";
					}else{
						if(hours>0){
							s = hours+" hour";
						}else{
							if(minute>0){
								s = minute+" minute";
							}else{
								if(seconds>0){
									s = seconds+" seconds";
								}
							}
						}
					}
				}
			}
		}catch (Exception e) {
			//println.error("-----Exception in getTimeDifference of DefaultMethods----- as "+e);
		}
    	return s;
    }

    public static String getTimeDifference3(Date d1,Date d2){
    	String s = "#";
    	try {
			if(d1.compareTo(d2)==1){
				java.util.Date d3 = d2;
				d2 = d1;
				d1 = d3;
			}

			Period period = new Period(new LocalDate(d1), new LocalDate(d2), PeriodType.yearMonthDayTime());

			long diff = d2.getTime() - d1.getTime();

			long seconds = (long)(diff / (long)1000) % (long)60;
			long minute = (long)(diff / (60 * 1000)) % 60;
			long hours = (long)(diff / (60 * 60 * 1000)) % 24;
			long days = diff / (24 * 60 * 60 * 1000);
			long month = period.getMonths();//diff / (30 * 24 *60 *60 * 1000);
			long year = period.getYears();//diff / (365 * 24 *60 *60 * 1000);

			if(year>0){
				s = year+" year";
			}else{
				if(month>0){
					s = month+" month";
				}else{
					if(days>0){
						s = days+" days";
					}else{
						if(hours>0){
							s = hours+" hr";
						}else{
							if(minute>0){
								s = minute+" min";
							}else{
								if(seconds>0){
									s = seconds+" sec";
								}
							}
						}
					}
				}
			}
		}catch (Exception e) {
			//println.error("-----Exception in getTimeDifference of DefaultMethods----- as "+e);
		}
    	return s;
    }

	public static boolean isSubscribed(Set<Subscription> subscriptions, user){
		boolean flag = false;
		if(subscriptions){
			for(Subscription sub:subscriptions){
				if(sub.user.id == user.id){
					flag = true;
					break;
				}
			}
		}
		return flag;
	}

	public static Seriousness getSeriousness(Set<Subscription> subscriptions, user){
		Seriousness seriousness = Seriousness.CASUAL;
		if(subscriptions){
			for(Subscription sub:subscriptions){
				if(sub.user.id == user.id){
					seriousness = sub.seriousness
					break;
				}
			}
		}
		println "returning s "+seriousness;
		return seriousness;
	}
}
