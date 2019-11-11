using System;

namespace <%=namespace%>.domain.<%= changeCase.titleCase(name)%>s.Messages.Commands
{
    public class Delete<%= changeCase.titleCase(name)%>: <%= changeCase.titleCase(name)%>BaseCommand
    {
        public override Guid Id { get; set; }
        public Delete<%= changeCase.titleCase(name)%>(Guid id) : base()
        {
            this.Id = id;
        }

    }
}