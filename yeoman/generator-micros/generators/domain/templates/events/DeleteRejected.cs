using System;
/// <summary>
/// This file was generated by the yeoman generator "generator-micros"
/// @author: <%=author.name%>
/// @email: <%=author.email%>
/// @created_on: <%= new Date()%>
/// </summary>
namespace <%=appname%>.domain.<%= domain%>s.Messages.Events
{
    public class Delete<%= pascalDomain%>Rejected : <%= pascalDomain%>BaseRejectedEvent
    {
        public Delete<%= pascalDomain%>Rejected(Guid id, string reason, string code) : base(id, reason, code)
        {
        }
    }
}
