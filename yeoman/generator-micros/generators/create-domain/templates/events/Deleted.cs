using Newtonsoft.Json;
using System;

namespace <%=namespace%>.domain.<%= changeCase.titleCase(name)%>s.Messages.Events
{
    public class <%= changeCase.titleCase(name)%>Deleted:<%= changeCase.titleCase(name)%>BaseEvent
    {

        public Guid Id { get; }

        public <%= changeCase.titleCase(name)%>Deleted(Guid id)
        {
            Id = id;
        }
    }
}
