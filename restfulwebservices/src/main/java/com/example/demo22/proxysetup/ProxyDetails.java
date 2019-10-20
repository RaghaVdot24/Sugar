package com.example.demo22.proxysetup;


public class ProxyDetails<T1,T2,T3> {
    private T1 host;
    private T2 port;
    private T3 userAgent;

    public T1 getHost() {
        return host;
    }

    public void setHost(T1 host) {
        this.host = host;
    }

    public T2 getPort() {
        return port;
    }

    public void setPort(T2 port) {
        this.port = port;
    }

    public T3 getUserAgent() {
        return userAgent;
    }

    public void setUserAgent(T3 userAgent) {
        this.userAgent = userAgent;
    }

    @Override
    public String toString() {
        return "ProxyDetails [host=" + host + ", port=" + port + ", userAgent=" + userAgent + "]";
    }

    public ProxyDetails(T1 host, T2 port) {
        this.host = host;
        this.port = port;
    }

    
    
}