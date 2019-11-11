using System;

namespace <%=namespace%>.domain.<%= changeCase.titleCase(name)%>s.Messages.Commands
{

    public class Create<%= changeCase.titleCase(name)%> : <%= changeCase.titleCase(name)%>BaseCommand
    {
        public override Guid Id { get; set; }

        <%props.forEach(property=>{
            %>public <%= property.type%>  <%= changeCase.titleCase(property.name)%>{get;}
        <%})%>



        public Create<%= changeCase.titleCase(name)%>(Guid id<%props.forEach(property=>{%>,<%=property.type%> <%=changeCase.lowerCase( property.name)%> <%})%>) : base()
        {
            Id = id;
            <%props.forEach(property=>{%><%=changeCase.titleCase(property.name) %> = <%= changeCase.lowerCase(property.name) %> ;
            <%}) %>
        }
    }
}
