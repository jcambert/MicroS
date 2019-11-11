using AutoMapper;
using <%=namespace%>.domain.<%= changeCase.titleCase(name)%>s.Domain;
using <%=namespace%>.domain.<%= changeCase.titleCase(name)%>s.Dto;
using <%=namespace%>.domain.<%= changeCase.titleCase(name)%>s.Messages.Commands;
using <%=namespace%>.domain.<%= changeCase.titleCase(name)%>s.Messages.Events;

namespace <%=namespace%>.domain.<%= changeCase.titleCase(name)%>s.Mapping
{
    public class <%= changeCase.titleCase(name)%>Profile:Profile
    {
        public <%= changeCase.titleCase(name)%>Profile()
        {
            CreateMap<<%= changeCase.titleCase(name)%>, <%= changeCase.titleCase(name)%>Dto>().ConstructUsing(e => new <%= changeCase.titleCase(name)%>Dto() { Id = e.Id<%props.forEach(property=>{%>,<%=changeCase.titleCase(property.name) %> = e.<%=changeCase.titleCase(property.name) %><%}) %>  });
            CreateMap<Create<%= changeCase.titleCase(name)%>, <%= changeCase.titleCase(name)%>>().ConstructUsing(e => new <%= changeCase.titleCase(name)%>(e.Id<% props.forEach(property=>{%>,e.<%=changeCase.titleCase(property.name) %><%}) %>));
            CreateMap<Create<%= changeCase.titleCase(name)%>, <%= changeCase.titleCase(name)%>Created>().ConstructUsing(e => new <%= changeCase.titleCase(name)%>Created(e.Id<% props.forEach(property=>{%>,e.<%=changeCase.titleCase(property.name) %><%}) %>));
            CreateMap<Update<%= changeCase.titleCase(name)%>, <%= changeCase.titleCase(name)%>Updated>().ConstructUsing(e => new <%= changeCase.titleCase(name)%>Updated(e.Id<% props.forEach(property=>{%>,e.<%=changeCase.titleCase(property.name) %><%}) %>));
            CreateMap<Delete<%= changeCase.titleCase(name)%>, <%= changeCase.titleCase(name)%>Deleted>().ConstructUsing(e => new <%= changeCase.titleCase(name)%>Deleted(e.Id));            
        }
    }
}
