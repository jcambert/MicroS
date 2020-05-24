from tomcat
MAINTAINER AMBERT Jean-Christophe jc.ambert@free.fr

ENV \
  JS_VERSION=7.5.0 \
  JS_Xmx=512m \
  JS_MaxPermSize=256m \
  JS_CATALINA_OPTS="-XX:+UseBiasedLocking -XX:BiasedLockingStartupDelay=0 -XX:+UseParNewGC -XX:+UseConcMarkSweepGC -XX:+DisableExplicitGC -XX:+CMSIncrementalMode -XX:+CMSIncrementalPacing -XX:+CMSParallelRemarkEnabled -XX:+UseCompressedOops -XX:+UseCMSInitiatingOccupancyOnly" \
  JS_DB_TYPE=mysql \
  JS_DB_HOST=jasper.db \
  JS_DB_PORT=3306 \
  JS_DB_USER=jasper \
  JS_DB_PASSWORD=my_password \
  JASPERSERVER_HOME=/jasperserver \
  JASPERSERVER_BUILD=/jasperserver/buildomatic \
  JRS_DBCONFIG_REGEN=false \
  JRS_HTTPS_ONLY=false \
  BUILDOMATIC_MODE=script
  COPY resources/TIB_js-jrs-cp_${JS_VERSION}_bin.zip /tmp/jasperserver.zip
  COPY entrypoint.sh /  

RUN \
  apt-get update && \
  apt-get install -y vim netcat unzip curl && \  
  #curl -SL https://sourceforge.net/projects/jasperserver/files/JasperServer/JasperReports%20Server%20Community%20edition%20${JS_VERSION}/TIB_js-jrs-cp_${JS_VERSION}_bin.zip -o /tmp/jasperserver.zip && \
  unzip /tmp/jasperserver.zip -d $JASPERSERVER_HOME && \  
  mv -v $JASPERSERVER_HOME/jasperreports-server-cp-${JS_VERSION}-bin/* $JASPERSERVER_HOME && \
  chmod +x /entrypoint.sh && \ 
  rm -rf $JASPERSERVER_HOME/jasperreports-server-cp-${JS_VERSION}-bin && \
  rm -rf /tmp/* && \
  rm -rf /var/lib/apt/lists/*

ENTRYPOINT ["/entrypoint.sh"]

CMD ["run"]