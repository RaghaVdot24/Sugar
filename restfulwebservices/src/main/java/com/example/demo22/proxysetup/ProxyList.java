package com.example.demo22.proxysetup;

import java.util.ArrayList;
import java.util.List;
import com.example.demo22.proxysetup.ProxyDetails;

public class ProxyList {
    private List<ProxyDetails<String,String,String>> pList = new ArrayList<>();
    private String uAgents[] = {"Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2227.1 Safari/537.36",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2227.0 Safari/537.36",
    "Opera/9.80 (X11; Linux i686; Ubuntu/14.10) Presto/2.12.388 Version/12.16",
    "Opera/9.80 (Windows NT 6.0) Presto/2.12.388 Version/12.14",
    "Mozilla/5.0 (Windows NT 6.0; rv:2.0) Gecko/20100101 Firefox/4.0 Opera 12.14",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246",
    "Mozilla/5.0 (Windows NT 6.3; rv:36.0) Gecko/20100101 Firefox/36.0",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10; rv:33.0) Gecko/20100101 Firefox/33.0",
    "Mozilla/5.0 (X11; Linux i586; rv:31.0) Gecko/20100101 Firefox/31.0"};
    int lenAgents;
    int lenProxy;

    public ProxyList()
    {
        pList.add(new ProxyDetails<String, String,String>("175.110.107.26", "49145"));
        pList.add(new ProxyDetails<String, String,String>("202.169.37.126", "31333"));
        pList.add(new ProxyDetails<String, String,String>("103.245.188.86", "54385"));
        pList.add(new ProxyDetails<String, String,String>("181.112.42.38", "38264"));
        pList.add(new ProxyDetails<String, String,String>("194.181.82.190", "35447"));
        pList.add(new ProxyDetails<String, String,String>("187.111.160.29", "40098"));
        pList.add(new ProxyDetails<String, String,String>("95.65.73.200","49881"));
        pList.add(new ProxyDetails<String, String,String>("85.175.226.106","41175"));
        pList.add(new ProxyDetails<String, String,String>("181.129.133.74","56827"));
        pList.add(new ProxyDetails<String, String,String>("117.206.83.26","41960"));
        pList.add(new ProxyDetails<String, String,String>("110.232.76.94","54180"));
        pList.add(new ProxyDetails<String, String,String>("85.222.191.222","36337"));
        lenAgents = 9;
        lenProxy = 5;
        
    }

    public ProxyDetails<String,String,String> getProxy()
    {
        ProxyDetails<String,String,String> pd = pList.get((int)(Math.random()*lenProxy));
        pd.setUserAgent(uAgents[(int)(Math.random()*lenAgents)]);
        return pd;
    }


}