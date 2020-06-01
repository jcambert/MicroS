using System;
/// <summary>
/// This file was generated by the yeoman generator "generator-micros"
/// @author: <%=author.name%>
/// @email: <%=author.email%>
/// @created_on: <%= new Date()%>
/// </summary>
namespace <%=appname%>.domain.<%= domain%>s.Messages.Commands
{
    public class Delete<%= pascalDomain%>: <%= pascalDomain%>BaseCommand
    {
        <%if(entity){%>
        public override Guid Id { get; set; }
        public Delete<%= pascalDomain%>(Guid id) : base()
        {
            this.Id = id;
        }
        <%}else{%>
         public Delete<%= pascalDomain%>() : base(){
             //TODO SET AN ID HERE
         }
        <%}%>

    }
}