using AutoMapper;
using MicroS_Common.Handlers;
using MicroS_Common.RabbitMq;
using MicroS_Common.Types;
using System.Threading.Tasks;
using weerp.domain.<%= changeCase.titleCase(name) %>s.Domain;
using weerp.domain.<%= changeCase.titleCase(name) %>s.Messages.Commands;
using weerp.domain.<%= changeCase.titleCase(name) %>s.Messages.Events;
using weerp.Services.<%= changeCase.titleCase(name) %>s.Repositories;

namespace weerp.Services.<%= changeCase.titleCase(name) %>s.Handlers
{
    public sealed class Create<%= changeCase.titleCase(name) %>Handler : DomainCommandHandler<Create<%= changeCase.titleCase(name) %>,<%= changeCase.titleCase(name) %>>
    {
        


        public Create<%= changeCase.titleCase(name) %>Handler(
            I<%= changeCase.titleCase(name) %>Repository <%= changeCase.lowerCase(name) %>Repository,
            IBusPublisher busPublisher,
            IMapper mapper):base(busPublisher,mapper,<%= changeCase.lowerCase(name) %>Repository)
        {
        }
        protected override async Task CheckExist(Create<%= changeCase.titleCase(name) %> command)
        {
            if (await (Repository as I<%= changeCase.titleCase(name) %>Repository).ExistsAsync(command.Name))
            {
                throw new MicroSException("<%= changeCase.lowerCase(name) %>_already_exists",$"<%= changeCase.titleCase(name) %>: '{command.Name}' already exists.");
            }
           
        }

        public override async Task HandleAsync(Create<%= changeCase.titleCase(name) %> command, ICorrelationContext context)
        {

            await base.HandleAsync(command, context);

            var product = GetDomainObject(command);
            
            await Repository.AddAsync(product);

            await BusPublisher.PublishAsync(CreateEvent<<%= changeCase.titleCase(name) %>Created>(command), context);
        }
    }
}
