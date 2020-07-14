using System;
using MicroS_Common.Domain;
using <%=appname%>.domain.<%=domain%>s.Messages.Events;
<%- include('./../../../common/templates/using') %>
/// <summary>
/// This file was generated by the yeoman generator "generator-micros"
/// @author: <%=author.name%>
/// @email: <%=author.email%>
/// @created_on: <%= new Date()%>
/// </summary>
namespace <%=appname%>.domain.<%= domain%>s.Messages.Commands
{
    [OnRejected(typeof(Update<%= pascalDomain%>Rejected))]
    public class Update<%= pascalDomain%> : Create<%= pascalDomain%>
    {
        
        public Update<%= pascalDomain%>(<%if(entity){%>Guid id,<%}%><%- include('./../../../common/templates/ctor') %>) : base(<%if(entity){%>id,<%}%><%- include('./../../../common/templates/ctorbase') %>)
        {
        }
    }
}
